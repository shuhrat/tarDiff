var vow = require('vow');
var _ = require('lodash');
var getContentsOf = require('./extractor');

var newPackage = '/Users/zumra6a/Downloads/tmp/releases/report-templates-r331-join-tc-2654603-rc.tar';
var oldPackage = '/Users/zumra6a/Downloads/tmp/releases/report-templates-r330-join-tc-2648560-rc.tar';

var packageNewFilesInfo = function(newPackageFiles, oldPackageFiles) {
    var files = _.difference(newPackageFiles, oldPackageFiles);
    if (!_.isEmpty(files)) {
        console.info('Some files were added to the package!');
        console.log(files.join('\n'));
    }
};

var packageRemovedFilesInfo = function(newPackageFiles, oldPackageFiles) {
    var files = _.difference(oldPackageFiles, newPackageFiles);
    if (!_.isEmpty(files)) {
        console.info('Some files were removed from the package!');
        console.log(files.join('\n'));
    }
};

var calculateChangeRateFiles = function(files, newPackageContents, oldPackageContents) {
    var oldSize = 0;
    var newSize = 0;

    _.each(files, function(filePath) {
        oldSize += oldPackageContents[filePath];
        newSize += newPackageContents[filePath];
    });

    if ( oldSize * 1.02 < newSize) {
        console.error('qweqweqweqwe');
    }

    console.log('old size', oldSize);
    console.log('new size', newSize);
};

vow.all([getContentsOf(newPackage), getContentsOf(oldPackage)])
    .spread(function(newPackageContents, oldPackageContents) {
        var newPackageFiles = _.keys(newPackageContents);
        var oldPackageFiles = _.keys(oldPackageContents);

        packageNewFilesInfo(newPackageFiles, oldPackageFiles);
        packageRemovedFilesInfo(newPackageFiles, oldPackageFiles);

        var updatedFiles = _.intersection(newPackageFiles, oldPackageFiles);
        calculateChangeRateFiles(updatedFiles, newPackageContents, oldPackageContents);

    })
    .fail(console.error);


