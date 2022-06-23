# frozen_string_literal: true

class AddUserToOrganization < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :organization_id, :integer
  end
end
