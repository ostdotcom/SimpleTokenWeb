module Util

  module SaleMilestone

    include ActionView::Helpers::NumberHelper

    def total_st_token_sold
      (sale_details['total_st_token_sold']).to_i
    end

    def total_eth_raised
      sale_details['total_eth_raised'].to_f.round
    end

    def formatted_total_st_token_sold
      number_with_delimiter(total_st_token_sold)
    end

    def formatted_total_eth_raised
      number_with_delimiter(total_eth_raised)
    end

    def human_readable_format_total_st_token_sold
      human_readable_format(total_st_token_sold)
    end

    def human_readable_format(val)
      number_to_human(val, precision: 2, significant: false, units: {million: "M", thousand: "K", billion: "B"}, format: "%n%u")
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

    def last_milestone_to_show_st_value
      @last_milestone_to_show_st_value ||= case true
                                                when hard_cap_milestone_achieved?
                                                  GlobalConstant::StTokenSale.hard_cap_st_tokens_milestone
                                                when power_milestone_achieved?
                                                  GlobalConstant::StTokenSale.hard_cap_st_tokens_milestone
                                                when kicker_milestone_achieved?
                                                  GlobalConstant::StTokenSale.power_st_tokens_milestone
                                                when target_milestone_achieved?
                                                  GlobalConstant::StTokenSale.kicker_st_tokens_milestone
                                                else
                                                  GlobalConstant::StTokenSale.target_st_tokens_milestone
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

    def class_of_progress_bar(milestone_type)
      if is_milestone_complete(milestone_type)
        return 'complete'
      else
        return next_milestone_to_achieve == milestone_type ? 'in-progress' : ''
      end
    end

    def class_of_milestone(milestone_type)
      if is_milestone_complete(milestone_type)
        return last_milestone_achieved == milestone_type ? 'complete last-milestone' : 'complete'
      else
        return next_milestone_to_achieve == milestone_type ? 'in-progress' : ''
      end
    end

    def width_of_progress_bar(milestone_type)
      if is_milestone_complete(milestone_type)
        return 100
      elsif next_milestone_to_achieve != milestone_type
        0
      else
        min, max = 0, 100

        case milestone_type
          when 'hard_cap'
            min, max = GlobalConstant::StTokenSale.power_st_tokens_milestone, GlobalConstant::StTokenSale.hard_cap_st_tokens_milestone
          when 'power'
            min, max = GlobalConstant::StTokenSale.kicker_st_tokens_milestone, GlobalConstant::StTokenSale.power_st_tokens_milestone
          when 'kicker'
            min, max = GlobalConstant::StTokenSale.target_st_tokens_milestone, GlobalConstant::StTokenSale.kicker_st_tokens_milestone
          when 'target'
            min, max = 0, GlobalConstant::StTokenSale.target_st_tokens_milestone
          when 'soft_cap'
            min, max = 0, GlobalConstant::StTokenSale.soft_cap_st_tokens_milestone
        end

        ((total_st_token_sold - min) * 100.00 /(max - min)).round(2)
      end
    end

    def target_percent_achieved
      if target_milestone_achieved?
        return 100
      else
        val = ((total_st_token_sold * 100.00)/ GlobalConstant::StTokenSale.target_st_tokens_milestone)
        return (val > 99 ? val.to_i : val.round)
      end
    end


    def is_milestone_complete(milestone_type)
      send("#{milestone_type}_milestone_achieved?")
    end


  end
end