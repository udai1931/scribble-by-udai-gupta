# frozen_string_literal: true

module SampleData
  class UserService < Base
    USER_NAME = "Oliver Smith"

    attr_reader :user_name, :current_user

    def initialize
      @user_name = USER_NAME
    end

    def process!
      create_user!
    end

    private

      def create_user!
        @current_user = organization.users.create! \
          name: user_name
      end
  end
end
