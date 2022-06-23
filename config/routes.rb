# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  constraints(lambda { |req| req.format == :json }) do
    resources :articles, except: %i[new edit], param: :slug do
      post :index_by_state, on: :collection
    end
    resources :categories, except: %i[show new edit] do
      get :index_articles_by_category, on: :member
      get :index_articles_by_categories, on: :collection
    end
    resources :redirections, except: %i[show edit new]
    resource :organization, only: %i[update show]
    resource :session, only: %i[create]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
