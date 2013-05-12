Brandoarts::Application.routes.draw do

  match "/branding/:id" => "brandings#show"

  namespace :admins do
    resources :brandings
    resources :webs
  end

  devise_for :admins
  resources :admins

  resources :portfolios, :path => "portfolio"
  resources :clients
  resources :photos, :path => "photo"
  resources :brandings, :path => "branding"
  resources :webs, :path => "web"

  root :to => "home#index"
end