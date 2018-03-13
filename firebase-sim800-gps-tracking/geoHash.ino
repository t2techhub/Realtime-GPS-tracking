#include <stdio.h>
#include <stdlib.h>
//#define BITS_PER_BASE32_CHAR 5
//#define DEFAULT_PRECISION  10
//#define MAX_PRECISION 22

static const char BASE32_CHARS[] = "0123456789bcdefghjkmnpqrstuvwxyz";

static char valueToBase32Character(int value)
{
  if (value > 31) {
    // printf("Not a valid base32 value: %lu", (unsigned long)value);
    return 0;
  }
  return BASE32_CHARS[value];
}

static int base32CharToValue(char base32Char)
{
  for (int i = 0; i < 32; i++) {
    if (BASE32_CHARS[i] == base32Char) {
      return i;
    }
  }
  //printf ("Not a valid base32 character: %c", base32Char);
  return 0;
}

static int coordinatesValid(double latitude, double longitude) {
  return (latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180);
}


static char* makeHash(char *buffer, double latitude, double longitude, int precision) {
  if (precision < 1) {
    //printf ("Precision of GeoHash must be larger than zero!");
    return 0;
  }
  if (precision > MAX_PRECISION) {
    int max_char = MAX_PRECISION + 1;
    // printf("Precision of a GeoHash must be less than %u!", max_char);
    return 0;
  }
  if (!coordinatesValid(latitude, longitude)) {
    // printf("Not valid location coordinates: [%f, %f]", latitude, longitude);
    return 0;
  }
  double longitudeRange[] = { -180 , 180 };
  double latitudeRange[] = { -90 , 90 };




  for (int i = 0; i < precision; i++) {
    int hashValue = 0;
    for (int j = 0; j < BITS_PER_BASE32_CHAR; j++) {
      int even = (((i * BITS_PER_BASE32_CHAR) + j) % 2) == 0;
      double val = even ? longitude : latitude;
      double* range = (even) ? longitudeRange : latitudeRange;
      double mid = (range[0] + range[1]) / 2;
      if (val > mid) {
        hashValue = (hashValue << 1) + 1;
        range[0] = mid;
      } else {
        hashValue = (hashValue << 1);
        range[1] = mid;
      }
    }

    //  buffer[i] = valueToBase32Char(hashValue);
    if (hashValue > 31) {
      buffer[i] = 0;
    }
    buffer[i] = BASE32_CHARS[hashValue];
  }

  if (buffer == NULL) return NULL;
  return buffer;
}
