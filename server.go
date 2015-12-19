package main

import (
	"log"
	"net/http"
	"net/url"
	"os"
	"path"
	"strconv"
	"strings"
)

func main() {
	if len(os.Args) != 2 {
		log.Fatalln("Usage: server <port>")
	}
	if _, err := strconv.Atoi(os.Args[1]); err != nil {
		log.Fatalln("Invalid port:", os.Args[1])
	}

	http.HandleFunc("/contact_post", func(w http.ResponseWriter, r *http.Request) {
		if err := r.ParseForm(); err != nil {
			w.Write([]byte("<!doctype html><html><body>Failed to parse form.</body></html>"))
			return
		}
		name := r.PostFormValue("name")
		email := r.PostFormValue("email")
		message := r.PostFormValue("message")
		go http.PostForm("http://garrettlove.com/contact.php", url.Values{
			"action":  []string{"submit"},
			"name":    []string{name},
			"email":   []string{email},
			"message": []string{message},
		})
		http.Redirect(w, r, "contact_done.html", http.StatusTemporaryRedirect)
	})

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		p := path.Clean(r.URL.Path)
		p = path.Join("./", strings.Replace(p, "..", "", -1))
		if _, err := os.Stat(p); err == nil {
			http.ServeFile(w, r, path.Join("./", p))
		} else {
			http.ServeFile(w, r, "404.html")
		}
	})

	http.ListenAndServe(":"+os.Args[1], nil)
}
