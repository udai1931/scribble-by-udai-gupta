# frozen_string_literal: true

class SiteDetail < ApplicationRecord
  self.table_name = "site_details_tables"
  has_secure_password
end
