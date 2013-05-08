class ChangeLogosToBrandingsTable < ActiveRecord::Migration
	def change
		rename_table :logos, :brandings
	end
end
