# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  constraints(lambda { |req| req.format == :json }) do
    resources :articles, except: [:new, :edit], param: :slug do
      get :count, on: :collection
      post :state, on: :collection
      post :category, on: :collection
    end
    resources :categories, only: [:index, :create, :update, :destroy], param: :id
    resource :sitedetails, only: [:update, :show]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
