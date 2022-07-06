# frozen_string_literal: true

class ChangeScheduleColumns < ActiveRecord::Migration[6.1]
  def change
    rename_column :schedules, :state, :status
    rename_column :schedules, :scheduled_at, :execution_time
  end
end
