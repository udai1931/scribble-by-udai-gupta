# frozen_string_literal: true

class AddPolymorphicAssociationInSchedules < ActiveRecord::Migration[6.1]
  def change
    change_table :schedules do |t|
      t.references :scheduleable, polymorphic: true
    end
  end
end
