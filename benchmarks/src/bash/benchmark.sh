#!/usr/bin/env sh





DIRNAME=$(cd "$(dirname "${BASH_SOURCE}")" ; pwd -P)





node_benchmark ( ) {

	if [ -n "$NVM_BIN" ]
	then
		node "$DIRNAME/../node/benchmark-is.js"
	else
		"$NVM_BIN/node" "$DIRNAME/../node/benchmark-is.js"
	fi

}

plot_benchmark ( ) {
	Rscript "$DIRNAME/../R/plot-benchmark-data.R"
}





node_benchmark | plot_benchmark
