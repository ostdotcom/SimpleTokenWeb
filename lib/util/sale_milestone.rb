module Util

  module SaleMilestone

    include ActionView::Helpers::NumberHelper

    def total_st_token_sold
      (sale_details['total_st_token_sold']).to_i
    end

    def total_eth_raised
      sale_details['total_eth_raised'].to_f.round(2)
    end

    def formatted_total_st_token_sold
      number_with_delimiter(total_st_token_sold)
    end

    def formatted_total_eth_raised
      number_with_delimiter(total_eth_raised)
    end

    def community_bonus
      case last_milestone_achieved
        when 'hard_cap'
          30
        when 'power'
          30
        when 'kicker'
          25
        when 'target'
          20
        else
          0
      end
    end

    def soft_cap_milestone_achieved?
      total_st_token_sold >= GlobalConstant::StTokenSale.soft_cap_st_tokens_milestone
    end

    def target_milestone_achieved?
      total_st_token_sold >= GlobalConstant::StTokenSale.target_st_tokens_milestone
    end

    def kicker_milestone_achieved?
      total_st_token_sold >= GlobalConstant::StTokenSale.kicker_st_tokens_milestone
    end

    def power_milestone_achieved?
      total_st_token_sold >= GlobalConstant::StTokenSale.power_st_tokens_milestone
    end

    def hard_cap_milestone_achieved?
      total_st_token_sold >= GlobalConstant::StTokenSale.hard_cap_st_tokens_milestone
    end

    def next_milestone_to_achieve
      @next_milestone_to_achieve ||= case true
                                       when hard_cap_milestone_achieved?
                                         'none'
                                       when power_milestone_achieved?
                                         'hard_cap'
                                       when kicker_milestone_achieved?
                                         'power'
                                       when target_milestone_achieved?
                                         'kicker'
                                       when soft_cap_milestone_achieved?
                                         'target'
                                       else
                                         'soft_cap'
                                     end
    end

    def last_milestone_achieved
      @last_milestone_achieved ||= case true
                                     when hard_cap_milestone_achieved?
                                       'hard_cap'
                                     when power_milestone_achieved?
                                       'power'
                                     when kicker_milestone_achieved?
                                       'kicker'
                                     when target_milestone_achieved?
                                       'target'
                                     when soft_cap_milestone_achieved?
                                       'soft_cap'
                                     else
                                       'none'
                                   end
    end

    def state_of(milestone_type)
      if is_milestone_complete(milestone_type)
        return last_milestone_achieved == milestone_type ? 'lastMilestone' : 'passedMilestone'
      else
        return next_milestone_to_achieve == milestone_type ? 'nextMilestone' : 'futureMilestone'
      end
    end

    def is_milestone_complete(milestone_type)
      send("#{milestone_type}_milestone_achieved?")
    end

    #
    # def progress_bar_percent
    #   if has_sale_ended?
    #     100
    #   elsif has_general_access_sale_started?
    #     66.66 + interval_percent(GlobalConstant::StTokenSale.general_access_sale_start_date, GlobalConstant::StTokenSale.general_access_sale_end_date)
    #   elsif has_early_access_register_ended?
    #     33.33 + interval_percent(GlobalConstant::StTokenSale.early_access_register_end_date, GlobalConstant::StTokenSale.general_access_sale_start_date)
    #   else
    #     interval_percent(GlobalConstant::StTokenSale.early_access_register_start_date, GlobalConstant::StTokenSale.early_access_register_end_date)
    #   end
    # end
    #
    # def interval_percent(start_date, end_date)
    #   total_time_interval = end_date - start_date
    #   time_passed = current_time - start_date
    #   extra_percent = (time_passed*(33.33)/total_time_interval)
    #   extra_percent
    # end

    private


  end
end