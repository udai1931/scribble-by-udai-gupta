# frozen_string_literal: true

class AddIsPasswordProtectedToOrganization < ActiveRecord::Migration[6.1]
  def change
    add_column :organizations, :is_password_protected, :boolean, default: false
  end
end
