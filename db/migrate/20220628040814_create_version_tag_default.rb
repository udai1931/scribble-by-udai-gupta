# frozen_string_literal: true

class CreateVersionTagDefault < ActiveRecord::Migration[6.1]
  def change
    change_column :versions, :tag, :string, default: "drafted"
  end
end
