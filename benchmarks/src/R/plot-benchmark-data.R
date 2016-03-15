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





readStdin <- function ( ) {

	stdin <- file('stdin')

	open(stdin)

	lines <- list( )

	while (length(line <- readLines(stdin, n = 1)) > 0) {
		lines <- xJoin_( lines, list(line))
	}

	lines

}




groupedBenchmarks <-
	x_(readStdin( )) $
	xMap(toJSON) $
	xGroupBy(xAtKey('id')) $
	x_Map(group := {
		list(
			xFirstOf(group),
			xGroupBy(xAtKey('name'), xSecondOf(group)))
	})




x_(groupedBenchmarks) $
	xMap(benchmark := {

		id           <- xFirstOf(benchmark)
		time         <- as.numeric(Sys.time( ))
		observations <- xSecondOf(benchmark)

		data <-
			x_(observations) $
			xMap(observation := {

				data.frame(xSecondOf(observation))

			}) $
			x_Apply(rbind)

		ggplot(data) +
		geom_bar( aes(x = name, y = mean, fill = factor(name)),  stat = "identity")

		ggsave(file = paste0('benchmarks/images/', time, '-', id, '.png'))

	})
