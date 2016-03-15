#!/usr/bin/env Rscript





if (!require(devtools)) {
	install.packages("devtools", repos = 'http://ftp.heanet.ie/mirrors/cran.r-project.org/')
}

if (!require(kea)) {
	devtools::install_github("rgrannell1/kea", ref = 'releases')
	library(kea)
}

if (!require(jsonlite)) {
	install.packages(jsonlite)
	require(jsonlite)
}





stdin <- file('stdin')

open(stdin)





benchmarks <- list( )

while (length(line <- readLines(stdin, n = 1)) > 0) {
	benchmarks = c(benchmarks, fromJSON(line))
}

print(benchmarks)
