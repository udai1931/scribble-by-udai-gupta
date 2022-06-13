# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  constraints(lambda { |req| req.format == :json }) do
    resources :articles, only: [:create, :index], param: :slug
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
