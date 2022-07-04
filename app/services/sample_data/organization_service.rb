# frozen_string_literal: true

module SampleData
  class OrganizationService < Base
    ORGANIZATION_NAME = "Spinkart"
    ORGANIZATION_PASSWORD = "welcome"

    attr_reader :organization_name, :organization_password, :organization

    def initialize
      @organization_name = ORGANIZATION_NAME
      @organization_password = ORGANIZATION_PASSWORD
    end

    def process!
      create_organization!
    end

    private

      def create_organization!
        @organization = Organization.create! \
          name: organization_name,
          password: organization_password
      end
  end
end
