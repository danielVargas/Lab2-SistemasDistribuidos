require 'net/http'
print "Hello, World!\n"

uri = URI('http://localhost:3000/part/2')

res = Net::HTTP.get(uri)
puts res