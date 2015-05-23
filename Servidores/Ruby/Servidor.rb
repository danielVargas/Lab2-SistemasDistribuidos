require 'net/http'
require 'json'
require 'uri'

# ref : http://stackoverflow.com/questions/11091434/using-the-bubble-sort-method-for-an-array-in-ruby
def bubble_sort(list)
  return list if list.size <= 1 # already sorted
  swapped = true
  while swapped do
    swapped = false
    0.upto(list.size-2) do |i|
      if list[i] > list[i+1]
        list[i], list[i+1] = list[i+1], list[i] # swap values
        swapped = true
      end
    end    
  end

  list
end
#ref: https://gist.github.com/aspyct/3433278

def quicksort(array, from=0, to=nil)
    if to == nil
        # Sort the whole array, by default
        to = array.count - 1
    end
 
    if from >= to
        # Done sorting
        return
    end
 
    # Take a pivot value, at the far left
    pivot = array[from]
 
    # Min and Max pointers
    min = from
    max = to
 
    # Current free slot
    free = min
 
    while min < max
        if free == min # Evaluate array[max]
            if array[max] <= pivot # Smaller than pivot, must move
                array[free] = array[max]
                min += 1
                free = max
            else
                max -= 1
            end
        elsif free == max # Evaluate array[min]
            if array[min] >= pivot # Bigger than pivot, must move
                array[free] = array[min]
                max -= 1
                free = min
            else
                min += 1
            end
        else
            raise "Inconsistent state"
        end
    end
 
    array[free] = pivot
 
    quicksort array, from, free - 1
    quicksort array, free + 1, to
end
 
def mergesort(array)
    if array.count <= 1
        # Array of length 1 or less is always sorted
        return array
    end
 
    # Apply "Divide & Conquer" strategy
 
    # 1. Divide
    mid = array.count / 2
    part_a = mergesort array.slice(0, mid)
    part_b = mergesort array.slice(mid, array.count - mid)
 
    # 2. Conquer
    array = []
    offset_a = 0
    offset_b = 0
    while offset_a < part_a.count && offset_b < part_b.count
        a = part_a[offset_a]
        b = part_b[offset_b]
 
        # Take the smallest of the two, and push it on our array
        if a <= b
            array << a
            offset_a += 1
        else
            array << b
            offset_b += 1
        end
    end
 
    # There is at least one element left in either part_a or part_b (not both)
    while offset_a < part_a.count
        array << part_a[offset_a]
        offset_a += 1
    end
 
    while offset_b < part_b.count
        array << part_b[offset_b]
        offset_b += 1
    end
 
    return array
end
 


uri = URI('http://localhost:3000/part/2')

res = Net::HTTP.get(uri)
puts res

res.gsub! '[', ''
res.gsub! ']', ''
res.gsub! '"', ''

array = res.split(',')
arra2 = Array.new
array.each do |elemento|
   arra2.push(elemento.to_f)
end
puts arra2

bubble_sort(arra2)
puts "Merger Sort"
puts arra2

mergesort(arra2)
puts "Bubble Sort"
puts arra2

quicksort(arra2)
puts "Quick Sort"
puts arra2


a = arra2*"','"
puts a

uri = URI.parse('http://localhost:3000/part/8')
 http = Net::HTTP.new(uri.host, uri.port)
# ruby 2.0: req = Net::HTTP::Post.new uri

header = {'Content-Type': 'text/json'}
user = {user: a}

response = Net::HTTP::Post.new(uri.path, initheader = {'Content-Type' =>'application/json'})
response.body = user.to_json
response = http.request(response)