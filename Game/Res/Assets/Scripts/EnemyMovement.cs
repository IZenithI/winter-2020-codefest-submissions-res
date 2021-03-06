﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class EnemyMovement : MonoBehaviour
{
    // Movement Variables
    public float speed = 3;
    bool faceR = true;

    private Rigidbody2D rb2d;
    private Transform target;

    // Start is called before the first frame update
    void Start()
    {
        rb2d = GetComponent<Rigidbody2D>();
        target = GameObject.FindGameObjectWithTag("Player").GetComponent<Transform>();
    }

    // Update is called once per frame
    void Update()
    {
        transform.position = Vector2.MoveTowards(transform.position, new Vector2(target.position.x, transform.position.y), speed * Time.deltaTime);
        //if (faceR == true && target.position.magnitude > transform.position.magnitude || faceR == false && target.position.magnitude < transform.position.magnitude)
        if(faceR == true && target.position.x < transform.position.x || faceR == false && target && target.position.x > transform.position.x)
        {
            Flip();
        }
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        //if(collision.name == "Player" || collision.name == "Player(Clone)" || collision.name == "Projectile(Clone)")
        if (collision.name == "Player")
        {
            Destroy(collision.gameObject);
            SceneManager.LoadScene("TitleScreen");
        }
    }
    void Flip()
    {
        faceR = !faceR;
        Vector3 Scaler = transform.localScale;
        Scaler.x *= -1;
        transform.localScale = Scaler;
    }
}
