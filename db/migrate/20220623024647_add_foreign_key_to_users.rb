# frozen_string_literal: true

class AddForeignKeyToUsers < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :users, :organizations, column: :organization_id
  end
end
