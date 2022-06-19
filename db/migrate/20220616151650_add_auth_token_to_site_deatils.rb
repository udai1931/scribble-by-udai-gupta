# frozen_string_literal: true

class AddAuthTokenToSiteDeatils < ActiveRecord::Migration[6.1]
  def change
    add_column :site_details_tables, :auth_token, :string
  end
end
