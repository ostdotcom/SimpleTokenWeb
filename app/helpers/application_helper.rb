module ApplicationHelper

  # does action require a specific css manifest file
  #
  # * Author: Kedar
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def has_specific_css_manifest_file?
    @page_assets_data.present? ? !(@page_assets_data[:specific_css_required] == 0) : true
  end

  # does action require a specific js manifest file
  #
  # * Author: Kedar
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def has_specific_js_manifest_file?
    @page_assets_data.present? ? !(@page_assets_data[:specific_js_required] == 0) : true
  end

  # get specific manifest path for css and js
  #
  # * Author: Kedar
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def specific_manifest_file_path
    action_name = @preview_template.present? ? @preview_template[:action] : params[:action]
    controller_name = @preview_template.present? ? @preview_template[:controller] : params[:controller]
    "#{controller_name}-#{get_formatted_action_name(action_name)}"
  end

  # format action name for specific manifest file path
  #
  # * Author: Kedar
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def get_formatted_action_name(action_name)
    action_name.gsub('_', '-')
  end

  # All pages used only by simple token and not kyc clients
  #
  # * Author: Aman
  # * Date: 09/02/2018
  # * Reviewed By:
  #
  def is_simple_token_specific_page?
    ['web/home', 'web/token_sale'].include?(params[:controller])
  end

  # All static pages used in simple token but not a part of kyc
  #
  # * Author: Aman
  # * Date: 06/02/2018
  # * Reviewed By:
  #
  def is_not_a_kyc_page?
    ['web/home', 'web/token_sale'].include?(params[:controller])
  end

end