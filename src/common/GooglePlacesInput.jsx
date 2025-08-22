import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const loaderSingleton = (() => {
  let loader;
  return () => {
    if (!loader) {
      const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

      if (!apiKey || apiKey === 'your_google_places_api_key_here') {
        console.error('Google Places API key is missing or invalid. Please add VITE_GOOGLE_PLACES_API_KEY to your .env file.');
        return null;
      }

      loader = new Loader({
        apiKey,
        version: 'weekly',
        libraries: ['places'],
        id: 'google-maps-js',
      });
    }
    return loader;
  };
})();

/**
 * Props:
 * - placeholder: string
 * - onSelect: ({ lat, lng, name }) => void
 * - className: string
 * - restrictCountry: string | string[]
 * - types: string[] (comprehensive list for real estate search)
 */
const GooglePlacesInput = ({
  placeholder = 'Search location',
  onSelect,
  className = 'common-input',
  restrictCountry = 'in',
  types = [], // Empty array means show all types of places
}) => {
  const hostRef = useRef(null);

  useEffect(() => {
    let cleanup = () => {};
    let isMounted = true;

    const init = async () => {
      try {
        const loader = loaderSingleton();

        // Handle missing API key
        if (!loader) {
          console.warn('Google Places API is not available. Location search will be disabled.');
          return;
        }

        await loader.load();

        // Ensure Places library is loaded. New API exposes PlaceAutocompleteElement, older exposes Autocomplete
        const placesModule = await google.maps.importLibrary('places'); // eslint-disable-line no-undef

        // Try new web component first
        const PlaceAutocompleteElement = placesModule?.PlaceAutocompleteElement || google.maps?.places?.PlaceAutocompleteElement;

        if (PlaceAutocompleteElement && hostRef.current) {
                  // Map legacy types to new primary types (best-effort) - comprehensive for real estate
        let includedPrimaryTypes = undefined;

        if (Array.isArray(types) && types.length > 0) {
          // If specific types are provided, use them
          if (types.includes('(cities)')) {
            includedPrimaryTypes = ['locality', 'administrative_area_level_1', 'administrative_area_level_2'];
          } else {
            includedPrimaryTypes = types;
          }
        } else {
          // Default to essential place types for real estate search (max 5 per Google API limit)
          // Using only valid Google Places API primary types
          includedPrimaryTypes = [
            'locality',                    // Cities (most important for real estate)
            'sublocality',                 // Neighborhoods/Sub-districts
            'administrative_area_level_2', // Districts/Counties
            'route',                      // Streets/Roads
            'establishment'               // Buildings and establishments
          ];
        }

          const element = new PlaceAutocompleteElement();
          if (includedPrimaryTypes) element.includedPrimaryTypes = includedPrimaryTypes;
          if (restrictCountry) {
            const regions = Array.isArray(restrictCountry) ? restrictCountry : [restrictCountry];
            element.includedRegionCodes = regions;
          }
          if (placeholder) element.placeholder = placeholder;
          if (className) element.className = className;

          hostRef.current.innerHTML = '';
          hostRef.current.appendChild(element);

          const handler = async (event) => {
            try {
              if (!isMounted) return;
              const prediction = event?.placePrediction;
              if (!prediction || typeof prediction.toPlace !== 'function') return;
              const place = prediction.toPlace();
              await place.fetchFields({ fields: ['displayName', 'formattedAddress', 'location'] });
              const name = place.displayName || place.formattedAddress;
              const location = place.location;

              // Update the input field with the selected place name
              const input = element.shadowRoot?.querySelector('input') || element.querySelector('input');
              if (input) {
                input.value = name;
              }

              if (location && typeof onSelect === 'function') {
                onSelect({ lat: location.lat(), lng: location.lng(), name });
              }
            } catch (e) {
              // eslint-disable-next-line no-console
              console.error('Place selection error', e);
            }
          };

          element.addEventListener('gmp-select', handler);
          // compatibility with potential alternate event names
          element.addEventListener('gmpx-placechange', handler);

          cleanup = () => {
            element.removeEventListener('gmp-select', handler);
            element.removeEventListener('gmpx-placechange', handler);
          };
          return; // Done with new element
        }

        // Fallback to legacy Autocomplete widget
        const AutocompleteCtor = placesModule?.Autocomplete || google.maps?.places?.Autocomplete;
        if (!AutocompleteCtor) {
          throw new Error('Google Places Autocomplete is unavailable. Ensure Places API is enabled for your key.');
        }

        // Create a plain input and attach legacy Autocomplete
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = placeholder || 'Search location';
        input.className = className || 'common-input';
        hostRef.current.innerHTML = '';
        hostRef.current.appendChild(input);

        const options = {
          fields: ['geometry', 'formatted_address', 'name'],
          types: Array.isArray(types) && types.length > 0 ? types : undefined, // Let Google show all types if none specified
          componentRestrictions: restrictCountry ? { country: restrictCountry } : undefined,
        };

        const autocomplete = new AutocompleteCtor(input, options);
        const listener = autocomplete.addListener('place_changed', () => {
          if (!isMounted) return;
          const place = autocomplete.getPlace();
          const name = place.formatted_address || place.name;
          const location = place?.geometry?.location;

          // Ensure the input field shows the selected place name
          if (input && name) {
            input.value = name;
          }

          if (location && typeof onSelect === 'function') {
            onSelect({ lat: location.lat(), lng: location.lng(), name });
          }
        });

        cleanup = () => {
          if (listener && typeof listener.remove === 'function') listener.remove();
        };
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Google Maps init error', err);

        // Fallback to a regular input when Google Places fails
        if (hostRef.current && isMounted) {
          const fallbackInput = document.createElement('input');
          fallbackInput.type = 'text';
          fallbackInput.placeholder = placeholder || 'Enter location';
          fallbackInput.className = className || 'common-input';

          fallbackInput.addEventListener('input', (e) => {
            if (isMounted && typeof onSelect === 'function') {
              // For fallback, we'll just use the text as the name without coordinates
              onSelect({ lat: null, lng: null, name: e.target.value });
            }
          });

          hostRef.current.innerHTML = '';
          hostRef.current.appendChild(fallbackInput);
        }
      }
    };

    init();

    return () => {
      isMounted = false;
      cleanup();
    };
  }, [onSelect, restrictCountry, types]);

  return (
    <div ref={hostRef} />
  );
};

export default GooglePlacesInput;


