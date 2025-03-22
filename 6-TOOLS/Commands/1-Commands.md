##### Commands

##### (1) 文件大小 / 分析所有文件大小

```
$ find . -type f -exec du -h {} + | sort -hr > file_sizes.txt


1
find . -type f
// The command means: find all the files whose type is file in the current directory.

2
-exec du -h {} +
// -exec: ----------------- It means that the files that be found should be executed command.
// du -h {}: -------------- It means that using 'du' command to calculate the size of file and using the language that people can understand.
// {}: -------------------- It means the files that
// +: --------------------- multiple

3
| sort -hr
// | : -------------------- It means to pass the previous result as parameter to next command.
// -hr : ------------------ -h:human -r:reverse

4
> file_sizes.txt
// > : -------------------- It means to write the result that be executed to the specified directory.
// file_sizes.txt: -------- It means the file that should be written.
```
