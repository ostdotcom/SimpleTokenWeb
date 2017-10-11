class Admin::BaseController < ApplicationController

  # TODO: Rework on this step
  private

  def step_1_logged_in?
    redirect_to '/admin/authentication' and return if step1_cookie_present?
  end

  def step_2_logged_in?
    redirect_to '/admin/dashboard' and return if step2_cookie_present?
  end

  def step1_cookie_present?
    @cookie_type == 'step_1'
  end

  def step2_cookie_present?
    @cookie_type == 'step_2'
  end

  def parse_cookie
    @cookie_type = nil
    cookie = cookies[GlobalConstant::Cookie.admin_cookie_name.to_sym]
    return unless cookie.present?
    @cookie_type = 'step_1' and return if cookie.include?(":s:")
    @cookie_type = 'step_2' if cookie.include?(":d:")
  end

end
