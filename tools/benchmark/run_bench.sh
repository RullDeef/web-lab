function bench() {
    local count=$1
    local url=http://localhost$2
    mkdir -p ./res/$2
    docker run -it --rm --network host alpine/bombardier -c $count -d 10s -l -p r -o json $url > res/$2/bench_$count.json
}

bench 50  /api/v1
bench 100 /api/v1
bench 150 /api/v1
bench 200 /api/v1
bench 250 /api/v1
bench 300 /api/v1

#mkdir ./res/balanced && mv ./res/api ./res/balanced
mkdir ./res/regular && mv ./res/api ./res/regular
