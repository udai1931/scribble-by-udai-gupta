# frozen_string_literal: true

module SampleData
  class LoaderService < Base
    include SampleData::LoadersList
    def process!
      return if skip?

      ActiveRecord::Base.descendants.map(&:reset_column_information)
      puts "\n#{'-' * 80}"
      puts "Loading sample data..."
      ActiveRecord::Base.logger.level = Logger::INFO

      ActiveRecord::Base.transaction do
        load_sample_data!
      rescue ActiveRecord::ActiveRecordError => error
        puts error.message
        raise ActiveRecord::Rollback
      end
      puts "#{'-' * 80}\n"
      true
    end

    private

      def load_sample_data!
        loaders_list.each do |loader_service|
          loader_service.new.load!
        end
      end
  end
end
