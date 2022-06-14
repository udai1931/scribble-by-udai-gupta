# frozen_string_literal: true

class CreateRedirectionsTable < ActiveRecord::Migration[6.1]
  def change
    create_table :redirections do |t|
      t.string :from, null: false, unique: true
      t.string :to, null: false
      t.timestamps
    end
  end
end
