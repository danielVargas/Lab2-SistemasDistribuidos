package main
import "fmt"
import "net/http"
import "io/ioutil"
import "encoding/json"

func perror(err error) {
    if err != nil {
        panic(err)
    }
}

func main() {

	
	url := "http://localhost:3000/part/3"

    res, err := http.Get(url)
    perror(err)

    defer res.Body.Close()
    body, err := ioutil.ReadAll(res.Body)
     perror(err)

    var data string
    err = json.Unmarshal(body, &data)
     perror(err)

   	fmt.Println(string(body[0]))

    fmt.Printf("hello, world\n")
}