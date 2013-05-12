Brandoarts::Application.routes.draw do
  namespace :admins do
    resources :brandings, :path => "branding"
    resources :websites, :path => "website"
  end

  devise_for :admins
  resources :admins

  resources :brandings, :path => "branding"
  resources :websites, :path => "website"

  root :to => "home#index"
end