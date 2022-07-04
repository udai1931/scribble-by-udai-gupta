desc "Sets up the project by running migration and populating sample data"
task setup: [:environment, "db:drop", "db:create", "db:migrate"] do
  Rake::Task[:setup_sample_data].invoke
end

task setup_sample_data: [:environment] do
  unless SampleData::LoaderService.new.process!
    print_skip_message
  end
end

def print_skip_message
  puts "Sample data loading is a destructive action and is not allowed in this environment."
  puts "If you are sure you want to reset the database, run this task after setting RESET_DATABASE_WITH_SAMPLE_DATA=true"
end
