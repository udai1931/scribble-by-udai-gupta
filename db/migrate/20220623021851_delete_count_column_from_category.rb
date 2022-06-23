# frozen_string_literal: true

class DeleteCountColumnFromCategory < ActiveRecord::Migration[6.1]
  def change
    remove_column :categories, :count
  end
end
