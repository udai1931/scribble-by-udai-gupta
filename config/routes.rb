# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  constraints(lambda { |req| req.format == :json }) do
    resources :articles, except: [:new, :edit], param: :slug
    resources :categories, only: [:index, :create]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
