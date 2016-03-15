#!/usr/bin/env Rscript




CRAN_MIRROR <- 'http://ftp.heanet.ie/mirrors/cran.r-project.org/'





if (!require(devtools)) {
	install.packages("devtools", repos = CRAN_MIRROR)
}

if (!require(kea)) {
	devtools::install_github("rgrannell1/kea", ref = 'releases')
	library(kea)
}

if (!require(jsonlite)) {
	install.packages(jsonlite)
	require(jsonlite)
}

if (!require(ggplot2)) {
	install.packages('ggplot2', repos = CRAN_MIRROR)
	require(ggplot2)
}





stdin <- file('stdin')

open(stdin)





benchmarks <- list( )

#while (length(line <- readLines(stdin, n = 1)) > 0) {
#	benchmarks <- xJoin_( benchmarks, list(fromJSON(line)) )
#}



benchmarks = list(

	list(
		id        = 0,
		name      = 'foo',
		mean      = 10,
		deviation = 2,
		hertz     = 100,
		rme       = 5
	),
	list(
		id        = 1,
		name      = 'foo',
		mean      = 10,
		deviation = 2,
		hertz     = 100,
		rme       = 5
	),
	list(
		id        = 0,
		name      = 'baz',
		mean      = 10,
		deviation = 2,
		hertz     = 100,
		rme       = 5
	),
	list(
		id        = 0,
		name      = 'baz',
		mean      = 10,
		deviation = 2,
		hertz     = 100,
		rme       = 5
	)

)





groupedBenchmarks <- x_(benchmarks) $ xGroupBy(xAtKey('id')) $ x_Map(group := {
	list(
		xFirstOf(group),
		xGroupBy(xAtKey('name'), xSecondOf(group)))
})




x_(groupedBenchmarks) $ xMap(benchmark := {

	id           <- xFirstOf(benchmark)
	observations <- xSecondOf(benchmark)

	x_(observations) $ x_Map(observation := {

		data.frame(xSecondOf(observation))

	})



})
