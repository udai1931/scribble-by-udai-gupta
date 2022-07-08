# frozen_string_literal: true

json.schedules @schedules do |schedule|
  json.extract! schedule,
    :id,
    :status
  json.execution_time schedule.execution_time.utc.getlocal.strftime("%I:%M%p, %D")
end
