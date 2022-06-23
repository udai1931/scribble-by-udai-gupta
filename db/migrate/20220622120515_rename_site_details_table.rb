# frozen_string_literal: true

class RenameSiteDetailsTable < ActiveRecord::Migration[6.1]
  def change
    rename_table :site_details_tables, :organizations
  end
end
