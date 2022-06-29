# frozen_string_literal: true

class MakeArticleStateDefault < ActiveRecord::Migration[6.1]
  def change
    change_column :articles, :state, :string, default: "draft"
  end
end
