

package xyz.vidieukhien.gpsrealtimelocation;

import android.content.DialogInterface;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.StringRes;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.firebase.ui.auth.AuthUI;
import com.firebase.ui.auth.IdpResponse;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.EmailAuthProvider;
import com.google.firebase.auth.FacebookAuthProvider;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.GoogleAuthProvider;
import com.google.firebase.auth.PhoneAuthProvider;
import com.google.firebase.auth.TwitterAuthProvider;
import com.bumptech.glide.annotation.GlideModule;
import com.bumptech.glide.module.AppGlideModule;

import java.util.Iterator;


public class SignedInActivity extends AppCompatActivity {

    private static final String TAG = "SignedInActivity";

    public static final String EXTRA_IDP_RESPONSE = "extra_idp_response";


    View mRootView;
    ImageView mUserProfilePicture;
    TextView mUserEmail;
    TextView mUserDisplayName;
    TextView mUserPhoneNumber;
    TextView mEnabledProviders;
    private IdpResponse mIdpResponse;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        FirebaseUser currentUser = FirebaseAuth.getInstance().getCurrentUser();
        if (currentUser == null) {
            finish();
            return;
        }
        setContentView(R.layout.signed_in_layout);

        mRootView = (View) findViewById(android.R.id.content);
        mUserProfilePicture = (ImageView) findViewById(R.id.user_profile_picture);
        mUserEmail = (TextView) findViewById(R.id.user_email);
        mUserDisplayName = (TextView) findViewById(R.id.user_display_name);
        mUserPhoneNumber = (TextView) findViewById(R.id.user_phone_number);
        mEnabledProviders = (TextView) findViewById(R.id.user_enabled_providers);
        Button btnSignOut = (Button) findViewById(R.id.sign_out);
        btnSignOut.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                signOut(view);
            }
        });
        Button btnDeleteAcc = (Button) findViewById(R.id.delete_account);
        btnDeleteAcc.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                deleteAccountClicked(view);
            }
        });
        mIdpResponse = getIntent().getParcelableExtra(EXTRA_IDP_RESPONSE);
        populateProfile();
        populateIdpToken();
    }

    private void signOut(View view) {
        AuthUI.getInstance()
                .signOut(this)
                .addOnCompleteListener(new OnCompleteListener<Void>() {
                    @Override
                    public void onComplete(@NonNull Task<Void> task) {
                        if (task.isSuccessful()) {
                            finish();
                        } else {
                            Log.w(TAG, "signOut:failure", task.getException());
                            showSnackbar(R.string.sign_out_failed);
                        }
                    }
                });
    }

    private void deleteAccountClicked(View view) {
        new AlertDialog.Builder(this)
                .setMessage("Are you sure you want to delete this account?")
                .setPositiveButton("Yes, nuke it!", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        deleteAccount();
                    }
                })
                .setNegativeButton("No", null)
                .show();
    }

    private void deleteAccount() {
        AuthUI.getInstance()
                .delete(this)
                .addOnCompleteListener(new OnCompleteListener<Void>() {
                    @Override
                    public void onComplete(@NonNull Task<Void> task) {
                        if (task.isSuccessful()) {

                            finish();
                        } else {
                            showSnackbar(R.string.delete_account_failed);
                        }
                    }
                });
    }

    private void populateProfile() {
        FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
        if (user.getPhotoUrl() != null) {

//            Picasso.get()
//                    .load(user.getPhotoUrl())
//                    .resize(80, 80)
//                    .centerCrop()
//                    .placeholder(R.drawable.ic_anon_user_48dp)
//                    .into(mUserProfilePicture);
            GlideApp.with(this)
                    .load(user.getPhotoUrl())
                    .fitCenter()
                    .into(mUserProfilePicture);
        }

        mUserEmail.setText(
                TextUtils.isEmpty(user.getEmail()) ? "No email" : user.getEmail());
        mUserPhoneNumber.setText(
                TextUtils.isEmpty(user.getPhoneNumber()) ? "No phone number" : user.getPhoneNumber());
        mUserDisplayName.setText(
                TextUtils.isEmpty(user.getDisplayName()) ? "No display name" : user.getDisplayName());

        StringBuilder providerList = new StringBuilder(100);

        providerList.append("Providers used: ");

        if (user.getProviders() == null || user.getProviders().isEmpty()) {
            providerList.append("none");
        } else {
            Iterator<String> providerIter = user.getProviders().iterator();
            while (providerIter.hasNext()) {
                String provider = providerIter.next();
                switch (provider) {
                    case GoogleAuthProvider.PROVIDER_ID:
                        providerList.append("Google");
                        break;
                    case FacebookAuthProvider.PROVIDER_ID:
                        providerList.append("Facebook");
                        break;
                    case TwitterAuthProvider.PROVIDER_ID:
                        providerList.append("Twitter");
                        break;
                    case EmailAuthProvider.PROVIDER_ID:
                        providerList.append("Email");
                        break;
                    case PhoneAuthProvider.PROVIDER_ID:
                        providerList.append("Phone");
                        break;
                    default:
                        throw new IllegalStateException("Unknown provider: " + provider);
                }

                if (providerIter.hasNext()) {
                    providerList.append(", ");
                }
            }
        }

        mEnabledProviders.setText(providerList);
    }

    private void populateIdpToken() {
        String token = null;
        String secret = null;
        if (mIdpResponse != null) {
            token = mIdpResponse.getIdpToken();
            secret = mIdpResponse.getIdpSecret();
        }
        View idpTokenLayout = findViewById(R.id.idp_token_layout);
        if (token == null) {
            idpTokenLayout.setVisibility(View.GONE);
        } else {
            idpTokenLayout.setVisibility(View.VISIBLE);
            ((TextView) findViewById(R.id.idp_token)).setText(token);
        }
        View idpSecretLayout = findViewById(R.id.idp_secret_layout);
        if (secret == null) {
            idpSecretLayout.setVisibility(View.GONE);
        } else {
            idpSecretLayout.setVisibility(View.VISIBLE);
            ((TextView) findViewById(R.id.idp_secret)).setText(secret);
        }
    }

    private void showSnackbar(@StringRes int errorMessageRes) {
        Snackbar.make(mRootView, errorMessageRes, Snackbar.LENGTH_LONG).show();
    }


}
