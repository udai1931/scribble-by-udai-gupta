# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  constraints(lambda { |req| req.format == :json }) do
    resources :articles, except: %i[new edit], param: :slug do
      collection do
        post :list_by_state
        get :count_by_state
        get :list_in_order_of_visits
      end
      member do
        get :versions
        get :list_future_updates
        post :create_future_update
      end
    end
    resources :categories, except: %i[show new edit] do
      get :list_articles, on: :member
      get :list_articles_in_order, on: :collection
    end
    resources :redirections, except: %i[show edit new]
    resource :organization, only: %i[update show]
    resource :session, only: %i[create]
    namespace :eui do
      resources :articles, only: %i[index]
    end
    resource :future_article_update, only: %i[create]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
