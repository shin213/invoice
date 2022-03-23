package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"strings"

	yaml "gopkg.in/yaml.v2"
)

func main() {
	const path = "../back/src/seed.yml"

	buf, err := ioutil.ReadFile(path)
	if err != nil {
		log.Fatal(err)
	}
	bufs := string(buf)

	// []byte を map[string]string に変換します。
	data, err := ReadOnSliceMap(buf)
	if err != nil {
		log.Fatal(err)
	}
	usersData := data["User"].([]interface{})
	users := make(map[string]string)
	for _, user := range usersData {
		userData := user.(map[interface{}]interface{})
		users[userData["id"].(string)] = userData["familyName"].(string) + userData["givenName"].(string)
	}

	for key, value := range users {
		bufs = strings.ReplaceAll(bufs, "Id: "+key, fmt.Sprintf("Id: %s # %s", key, value))
	}

	f, err := os.Create(path)
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()
	f.WriteString(bufs)
}

// yaml形式の[]byteを渡すとmap[string]stringに変換してくれる関数です。
func ReadOnSliceMap(fileBuffer []byte) (map[string]interface{}, error) {
	data := make(map[string]interface{}, 20)
	// ここで変換を行っています。
	// []byteを渡すとデータ型に合わせて上手い事マッピングしてくれます。
	err := yaml.Unmarshal(fileBuffer, &data)
	if err != nil {
		return nil, err
	}
	return data, nil
}
