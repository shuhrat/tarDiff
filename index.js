var vow = require('vow');
var _ = require('lodash');
var getContentsOf = require('./extractor');

var newPackage = '/Users/zumra6a/Downloads/tmp/releases/report-templates-r331-join-tc-2654603-rc.tar';
var oldPackage = '/Users/zumra6a/Downloads/tmp/releases/report-templates-r330-join-tc-2648560-rc.tar';

vow.all([getContentsOf(newPackage), getContentsOf(oldPackage)])
    .spread(function(newPackageContents, oldPackageContents) {
        var newPackageFiles = _.keys(newPackageContents);
        var oldPackageFiles = _.keys(oldPackageContents);

        var addedFiles = _.difference(newPackageFiles, oldPackageFiles);
        if (!_.isEmpty(addedFiles)) {
            console.info('Some files were added to the package!');
            console.log(addedFiles.join('\n'));
        }

        var removedFiles = _.difference(oldPackageFiles, newPackageFiles);
        if (!_.isEmpty(removedFiles)) {
            console.info('Some files were removed from the package!');
            console.log(removedFiles.join('\n'));
        }

        var updatedFiles = _.intersection(newPackageFiles, oldPackageFiles);
        if (!_.isEmpty(updatedFiles)) {
            var oldSize = 0;
            var newSize = 0;

            _.each(updatedFiles, function(filePath) {
                oldSize += oldPackageContents[filePath];
                newSize += newPackageContents[filePath];
            });

            if ( oldSize * 1.02 < newSize) {
                console.error('qweqweqweqwe');
            }

            console.log('old size', oldSize);
            console.log('new size', newSize);
        }
    })
    .fail(console.error);


