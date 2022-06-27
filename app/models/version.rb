# frozen_string_literal: true

class Version < ApplicationRecord
  enum tag: { drafted: "drafted", published: "published", restored: "restored" }

  belongs_to :article
  belongs_to :category
end
