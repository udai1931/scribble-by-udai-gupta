# frozen_string_literal: true

class IndexNotNullInCategory < ActiveRecord::Migration[6.1]
  def change
    change_column_null :categories, :index, false
  end
end
