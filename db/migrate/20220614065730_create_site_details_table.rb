# frozen_string_literal: true

class CreateSiteDetailsTable < ActiveRecord::Migration[6.1]
  def change
    create_table :site_details_tables do |t|
      t.string :name, null: false
      t.string :password_digest
      t.timestamps
    end
  end
end
