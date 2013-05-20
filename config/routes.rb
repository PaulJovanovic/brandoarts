Brandoarts::Application.routes.draw do

  match "/branding/:id" => "brandings#show"

  namespace :admins do
    resources :brandings
    resources :webs
    resources :photographies
    resources :portfolios
  end

  devise_for :admins
  resources :admins

  resources :portfolios, :path => "portfolio"
  resources :clients
  resources :photographies, :path => "photo"
  resources :brandings, :path => "branding"
  resources :webs, :path => "web"

  root :to => "home#index"
end