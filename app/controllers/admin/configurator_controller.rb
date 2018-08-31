class Admin::ConfiguratorController < Admin::BaseController
  layout "configurator"

  include ConfiguratorHelper

  before_action :check_admin_cookie

  before_action :set_page_meta_info

  before_action :set_configurator_accordion

  def theme

  end

  def register

  end

  def kyc_form

  end

  def dashboard

  end

  private

  def set_configurator_accordion
    if params[:accd_id].blank?
      et = get_action_entity_type_mapping
      acc = accordion_config(et)
      if acc.present?
        params[:accd_id] = acc.first[1]
      end
    end
  end

end
