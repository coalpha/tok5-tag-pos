#include <Windows.h>
#include <direct.h>

int main() {
   char *buf = malloc(123);
   GetModuleFileNameA(NULL, buf, 123);
   unsigned int i = 0;
   while (buf[i] != '\0') {
      i++;
   }

   while (i --> 0) {
      if (buf[i] == '\\') {
         buf[i] = '\0';
         break;
      }
   }
   _chdir(buf);
   system("node mkdb");
   system("node mktree");
   system("node mktags");
}
