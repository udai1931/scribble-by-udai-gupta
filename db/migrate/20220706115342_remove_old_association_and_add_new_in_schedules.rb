# frozen_string_literal: true

class RemoveOldAssociationAndAddNewInSchedules < ActiveRecord::Migration[6.1]
  def change
    remove_column :schedules, :article_id
  end
end
