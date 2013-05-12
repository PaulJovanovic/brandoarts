Brandoarts::Application.routes.draw do

  match "/branding/:id" => "brandings#show"

  namespace :admins do
    resources :brandings
    resources :websites
  end

  devise_for :admins
  resources :admins

  resources :portfolios, :path => "portfolio"
  resources :clients
  resources :photos, :path => "photo"
  resources :brandings, :path => "branding"
  resources :websites, :path => "website"

  root :to => "home#index"
end